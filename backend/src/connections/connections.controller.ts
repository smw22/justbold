import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { ConnectionsService } from "./connections.service";
import { CreateConnectionDto } from "./dto/create-connection.dto";
import { UpdateConnectionDto } from "./dto/update-connection.dto";

@Controller("connections")
export class ConnectionsController {
  constructor(private readonly svc: ConnectionsService) {}

  @Get()
  list(@Req() req: Request & { user: { id: string } }) {
    return this.svc.listForUser(req.user.id);
  }

  @Post()
  request(@Req() req: Request & { user: { id: string } }, @Body() dto: CreateConnectionDto) {
    return this.svc.request(req.user.id, dto);
  }

  @Patch(":id")
  respond(@Req() req: Request & { user: { id: string } }, @Param("id") id: string, @Body() dto: UpdateConnectionDto) {
    return this.svc.respond(req.user.id, id, dto);
  }

  @Delete(":id")
  remove(@Req() req: Request & { user: { id: string } }, @Param("id") id: string) {
    return this.svc.remove(req.user.id, id);
  }
}
