export interface IterationHistogramRequestBody {
    TableName: string;
    BucketColumn: string;
    Scenario: string;
    LearnRule: string;
  }
  
export interface HistogramEntry {
  RangeLabel: string;
  FinishedCount: number;
  TotalCount: number;
  AvgLearn: number;
  AvgStim: number;
}