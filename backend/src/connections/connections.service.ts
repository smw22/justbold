import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Connection } from "./entities/connection.entity";
import { User } from "../users/entities/user.entity";
import { CreateConnectionDto } from "./dto/create-connection.dto";
import { UpdateConnectionDto } from "./dto/update-connection.dto";

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection) private repo: Repository<Connection>,
    @InjectRepository(User) private users: Repository<User>
  ) {}

  async listForUser(userId: string) {
    const accepted = await this.repo.find({
      where: [
        { requester: { id: userId }, status: "accepted" },
        { addressee: { id: userId }, status: "accepted" },
      ],
      relations: ["requester", "addressee"],
    });
    const pending = await this.repo.find({
      where: [
        { requester: { id: userId }, status: "pending" },
        { addressee: { id: userId }, status: "pending" },
      ],
      relations: ["requester", "addressee"],
    });
    return { accepted, pending, me: userId };
  }

  async request(requesterId: string, dto: CreateConnectionDto) {
    const targetId = dto.targetUserId;
    if (requesterId === targetId) throw new BadRequestException("Cannot connect to yourself");

    const existing = await this.repo.findOne({
      where: [
        { requester: { id: requesterId }, addressee: { id: targetId } },
        { requester: { id: targetId }, addressee: { id: requesterId } },
      ],
      relations: ["requester", "addressee"],
    });

    if (existing) {
      if (existing.status === "declined") {
        existing.status = "pending";
        existing.requester = { id: requesterId } as User;
        existing.addressee = { id: targetId } as User;
        return this.repo.save(existing);
      }
      return existing;
    }

    const conn = this.repo.create({
      requester: { id: requesterId } as User,
      addressee: { id: targetId } as User,
      status: "pending",
    });
    return this.repo.save(conn);
  }

  async respond(userId: string, id: string, dto: UpdateConnectionDto) {
    const conn = await this.repo.findOne({ where: { id }, relations: ["addressee"] });
    if (!conn) throw new NotFoundException();
    if (conn.addressee.id !== userId) throw new ForbiddenException();
    conn.status = dto.action === "accept" ? "accepted" : "declined";
    return this.repo.save(conn);
  }

  async remove(userId: string, id: string) {
    const conn = await this.repo.findOne({ where: { id }, relations: ["requester", "addressee"] });
    if (!conn) throw new NotFoundException();
    if (conn.requester.id !== userId && conn.addressee.id !== userId) throw new ForbiddenException();
    await this.repo.remove(conn);
    return { success: true };
  }
}