package com.ho.springpratice.member;

public interface MemberMapper {
	public abstract int regMember(Member m);
	public abstract Member getMember(Member m);
	public abstract Member getMemberName(String m);
	public abstract Member getKakaoMember(String id);
}
