import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    report_no: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    sample_name: { type: String, required: true },
    sample_batch_no: { type: Number, required: true },
    produced_date: { type: Date, required: true },
    manufactured: { type: String, required: true },
    sgs_sample_no: { type: String, required: true },
    date_sample: { type: Date, required: true },
    test_period: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
