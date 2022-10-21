package com.ub.networthy.models;

public enum GoalStatus {

	NOT_STARTED,
	IN_PROGRESS,
	IN_REVIEW,
	FINISHED {
		@Override
		public GoalStatus next() {
			return FINISHED;
		}
	};
	
	public GoalStatus next() {
		
		return values()[ordinal() + 1];
	}
	
}
