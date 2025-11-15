export class newEnrollment {
  enrollmentId: number;
  studentName: string;
  contactNo: number | string;
  totalFees: string;
  emi1: string;
  emi2: string;
  emi3: string;
  totalReceived: number;
  status: string;
  isSoftDelete: boolean;
  batchId: number;

  constructor() {
    this.batchId = 0;
    this.enrollmentId = 0;
    this.studentName = '';
    this.contactNo = '';
    this.totalFees = '';
    this.emi1 = '';
    this.emi2 = '';
    this.emi3 = '';
    this.totalReceived = 0;
    this.status = '';
    this.isSoftDelete = true;
  }
}
