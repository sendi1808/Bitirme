import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CTScanDocument = CTScan & Document;

@Schema({ timestamps: true })
export class CTScan {
  @Prop({ required: true })
  patientId: string;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  filePath: string;

  @Prop({ required: true })
  fileSize: number;

  @Prop({ required: true })
  fileType: string;

  @Prop()
  diagnosis: string;

  @Prop()
  notes: string;
}

export const CTScanSchema = SchemaFactory.createForClass(CTScan); 