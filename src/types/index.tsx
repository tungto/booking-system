export type Cabin = {
	id?: string;
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	image: string | [File];
	description: string;
};
