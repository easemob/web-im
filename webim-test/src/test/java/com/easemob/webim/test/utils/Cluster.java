package com.easemob.webim.test.utils;

public enum Cluster {
	local_ebs("local_ebs"), 
	local_vip1("local_vip1"), 
	local_vip5("local_vip5"), 
	local_vip6("local_vip6"), 
	local_aws("local_aws"), 
	local_sdb("local_sdb");
	private String cluster;
	private Cluster(String cluster) {
		this.cluster = cluster;
	}
	public String getCluster() {
		return cluster;
	}
	public void setCluster(String cluster) {
		this.cluster = cluster;
	}
	public static Cluster getClusterEnum(String c) {
		for (Cluster cluster : values()) {
			if (cluster.getCluster().equalsIgnoreCase(c)) {
				return cluster;
			}
		}
		return null;
	}
	public static boolean isLegalEnum(String c) {
		for (Cluster cluster : values()) {
			if (cluster.getCluster().equalsIgnoreCase(c)) {
				return true;
			}
		}
		return false;
	}
}
