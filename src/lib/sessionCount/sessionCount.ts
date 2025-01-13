export interface IterationHistogramRequestBody {
    TableName: string;
    BucketColumn: string;
    Scenario: string;
    LearnRule: string;
    CountUnfinished: boolean;
    LimitDataSize: boolean;
    MinDataSize: number;
    MaxDataSize: number;
  }
  
export interface HistogramEntry {
  RangeLabel: string;
  FinishedCount: number;
  TotalCount: number;
  AvgLearn: number;
  AvgStim: number;
  AvgDataSize: number;
}