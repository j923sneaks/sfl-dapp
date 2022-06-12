export const batchAccounts = (length: number, address: string | null): string[] => {
	return address ? Array(length).fill(address) : [];
};
