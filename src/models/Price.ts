import mongoose, { Schema, Document, Model } from "mongoose";

export interface Checkpoint {
    id:string;
  location: string;
  price: number;
}

export interface Segment {
  from: string;
  to: string;
  price: number;
}

export interface Price extends Document {
  from: string;
  to: string;
  checkpoints: Checkpoint[];
  segments: Segment[];
  email:string

}


const PriceSchema: Schema<Price> = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      set: (v: string) => v.trim().toLowerCase(),
    },
    to: {
      type: String,
      required: true,
      set: (v: string) => v.trim().toLowerCase(),
    },

    checkpoints: [
      {
        id: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
          set: (v: string) => v.trim().toLowerCase(),
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    segments: [
      {
        from: {
          type: String,
          required: true,
          set: (v: string) => v.trim().toLowerCase(),
        },
        to: {
          type: String,
          required: true,
          set: (v: string) => v.trim().toLowerCase(),
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    email: {
      type: String,
      required: true,
      set: (v: string) => v.trim().toLowerCase(),
    },
  },
  { timestamps: true }
);

export const Price =
  (mongoose.models.Price as mongoose.Model<Price>) ||
  mongoose.model<Price>("Price", PriceSchema);


// (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",userSchema))