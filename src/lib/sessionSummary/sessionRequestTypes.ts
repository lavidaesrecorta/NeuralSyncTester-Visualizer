export interface NewNoOverlapRequestBody{
	N:               number[]
	K_last:          number
	L:               number
	M:               number
	Rule:            string
	MaxSessionCount: number
	MaxIterations:   number
}

export interface NewOverlapRequestBody{
	K:          	 number[]
	N_0:			 number
	L:               number
	M:               number
	Rule:            string
	MaxSessionCount: number
	MaxIterations:   number
	Scenario:		 string
}