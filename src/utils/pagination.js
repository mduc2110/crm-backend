export const getPagination = (page, limit) => {
   const size = limit ? +limit : null;
   const offset = page && +page !== 0 ? (+page - 1) * limit : null;
   return { size, offset };
};
export const getPagingData = (data, page, limit) => {
   const { count: totalItems, rows: results } = data;
   const currentPage = page ? +page : 0;
   const totalPages = limit ? Math.ceil(totalItems / limit) : 1;

   return { totalItems, results, totalPages, currentPage };
};
