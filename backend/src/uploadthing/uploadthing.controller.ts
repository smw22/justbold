import { Controller, Post, Get, UseInterceptors, UploadedFile, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UTApi, UTFile } from "uploadthing/server";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

// Initialize UTApi with token from environment variables
const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

@Controller("uploadthing")
export class UploadthingController {
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async handleAll(@UploadedFile() file?: MulterFile): Promise<{
    message: string;
    file: {
      url: string;
    };
  }> {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }
    try {
      const uint8Array = new Uint8Array(file.buffer);
      const utFile = new UTFile([uint8Array], file.originalname, {
        type: file.mimetype,
      });

      const result = await utapi.uploadFiles(utFile);

      // Handle the response structure: { data, error }
      if (result.error) {
        throw new BadRequestException(`File upload failed: ${result.error.message}`);
      }

      return {
        message: "File uploaded successfully",
        file: {
          url: result.data.ufsUrl,
        },
      };
    } catch (error) {
      console.error("❌ [Uploadthing] Upload failed:", error);
      throw new BadRequestException("File upload failed");
    }
  }

  @Get()
  testGet() {
    return {
      message: "Uploadthing controller is working!",
    };
  }
}
