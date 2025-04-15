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

  @Prop({ 
    type: {
      width: Number,
      height: Number,
      depth: Number,
      spacing: [Number],
      origin: [Number],
      direction: [Number]
    } 
  })
  sliceInfo?: {
    width: number;
    height: number;
    depth: number;
    spacing: number[];
    origin: number[];
    direction: number[];
  };
}

export const CTScanSchema = SchemaFactory.createForClass(CTScan); 