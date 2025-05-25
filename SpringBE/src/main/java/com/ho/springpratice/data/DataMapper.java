package com.ho.springpratice.data;

import java.util.List;

public interface DataMapper {
	public abstract int regData(Data d);
	public abstract List<Data> getData();
	public abstract int delData(String fn);
}
