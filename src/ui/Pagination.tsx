import { PAGE_SIZE } from '@/utils/constants';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledPagination = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const PaginationButton = styled.button`
	&:active,
	&:hover {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
	color: inherit;
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	background-color: var(--color-grey-50);

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
	justify-content: space-between;
	align-items: center;
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
	}
`;

type PaginationProps = {
	count: number;
};
const Pagination = ({ count }: PaginationProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const pageCount = Math.ceil(count / PAGE_SIZE);

	const currentPage = searchParams.get('page')
		? Number(searchParams.get('page'))
		: 1;

	function nextPage() {
		const nextPage =
			currentPage === pageCount ? currentPage : currentPage + 1;

		searchParams.set('page', String(nextPage));
		setSearchParams(searchParams);
	}

	function prevPage() {
		const prevPage = currentPage === 1 ? currentPage : currentPage - 1;

		searchParams.set('page', String(prevPage));
		setSearchParams(searchParams);
	}

	if (pageCount <= 1) return null;

	return (
		<StyledPagination>
			<P>
				Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to
				<span>
					{currentPage * PAGE_SIZE > count
						? count
						: currentPage * PAGE_SIZE}
				</span>
				of <span>{count}</span> results
			</P>
			<Buttons>
				<PaginationButton
					onClick={prevPage}
					disabled={currentPage === 1}>
					Previous
				</PaginationButton>
				<span>{currentPage}</span>
				<PaginationButton
					onClick={nextPage}
					disabled={currentPage === pageCount}>
					Next
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
};

export default Pagination;
