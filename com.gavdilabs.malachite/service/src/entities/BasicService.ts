export interface IUser {
  ID: string;
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

export interface ISFUser {
  userId: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  assignmentUUID: string;
  benchStrength: string;
  bonusBudgetAmount: number;
  bonusTarget: number;
  businessPhone: string;
  businessSegment: string;
  cellPhone: string;
  citizenship: string;
  city: string;
  companyExitDate: Date;
  compensationBonusEligible: boolean;
  compensationEligible: boolean;
  compensationReadOnly: boolean;
  compensationSalaryEligible: boolean;
  compensationSalaryRateType: string;
  compensationSalaryRateUnits: number;
  compensationStockEligible: boolean;
  competency: number;
  country: string;
  criticalTalentComments: string;
  custom01: string;
  custom02: string;
  custom03: string;
  custom04: string;
  custom06: string;
  custom07: string;
  custom08: string;
  custom09: string;
  custom10: string;
  custom11: string;
  custom12: string;
  custom13: string;
  custom14: string;
  custom15: string;
  dateOfBirth: Date;
  dateOfCurrentPosition: Date;
  dateOfPosition: Date;
  defaultFullName: string;
  defaultLocale: string;
  department: string;
  displayName: string;
  division: string;
  email: string;
  empId: string;
  employeeClass: string;
  ethnicity: string;
  fax: string;
  finalJobCode: string;
  finalJobFamily: string;
  finalJobRole: string;
  firstName: string;
  futureLeader: boolean;
  gender: string;
  hireDate: Date;
  homePhone: string;
  impactOfLoss: string;
  impactOfLossComments: string;
  isPrimaryAssignment: boolean;
  issueComments: string;
  jobCode: string;
  jobFamily: string;
  jobLevel: string;
  jobRole: string;
  jobTitle: string;
  keyPosition: boolean;
  lastModified: Date;
  lastModifiedDateTime: Date;
  lastModifiedWithTZ: Date;
  lastName: string;
  lastReviewDate: string;
  level: string;
  localCurrencyCode: string;
  location: string;
  lumpsum2Target: number;
  lumpsumTarget: number;
  married: boolean;
  matrix1Label: string;
  matrix2Label: string;
  matrixManaged: boolean;
  meritEffectiveDate: Date;
  meritTarget: Date;
  mi: string;
  minority: boolean;
  nationality: string;
  newToPosition: boolean;
  nickname: string;
  objective: number;
  onboardingId: string;
  origHireDate: Date;
  password: string;
  payGrade: string;
  performance: number;
  potential: number;
  promotionAmount: number;
  raiseProrating: number;
  reasonForLeaving: string;
  reloComments: string;
  reloLocation: string;
  reloWilling: string;
  reviewFreq: string;
  riskOfLoss: string;
  salary: number;
  salaryBudgetExtra2Percentage: number;
  salaryBudgetExtraPercentage: number;
  salaryBudgetFinalSalaryPercentage: number;
  salaryBudgetLumpsumPercentage: number;
  salaryBudgetMeritPercentage: number;
  salaryBudgetPromotionPercentage: number;
  salaryBudgetTotalRaisePercentage: number;
  salaryLocal: number;
  salaryProrating: number;
  salutation: string;
  sciLastModified: Date;
  seatingChart: string;
  serviceDate: Date;
  ssn: string;
  state: string;
  status: string;
  stockBudgetOptionAmount: number;
  stockBudgetOther1Amount: number;
  stockBudgetOther2Amount: number;
  stockBudgetOther3Amount: number;
  stockBudgetStockAmount: number;
  stockBudgetUnitAmount: number;
  suffix: string;
  sysCostOfSource: number;
  sysSource: number;
  sysStartingSalary: number;
  talentPool: string;
  teamMembersSize: number;
  timeZone: string;
  title: string;
  totalTeamSize: number;
  username: string;
  veteranDisabled: boolean;
  veteranMedal: boolean;
  veteranProtected: boolean;
  veteranSeparated: boolean;
  zipCode: string;
  
}

export enum Entity {
  User = "BasicService.User",
  SFUser = "BasicService.SFUser",
}

export enum SanitizedEntity {
  User = "User",
  SFUser = "SFUser",
}
