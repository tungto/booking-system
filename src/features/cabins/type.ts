export enum CabinsSortOptions {
	regularPriceASC = 'regularPrice-asc',
	regularPriceDSC = 'regularPrice-dsc',
	nameAsc = 'name-asc',
	nameDsc = 'name-dsc',
	maxCapacityAsc = 'maxCapacity-asc',
	maxCapacityDSC = 'maxCapacity-dsc',
}
export enum CabinFilterOptions {
	all = 'all',
	withDiscount = 'with-discount',
	noDiscount = 'no-discount',
}

export type CabinField = keyof Cabin;

export type Cabin = {
	id?: string;
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	image: string | [File];
	description: string;
};
