export interface IterationHistogramRequestBody {
    TableName: string;
    Scenario: string;
    LearnRule: string;
    Min: number;
    Max: number;
    BucketCount: number;
  }
  
export interface HistogramEntry {
  RangeLabel: string;
  FinishedCount: number;
  TotalCount: number;
  AvgLearn: number;
  AvgStim: number;
}