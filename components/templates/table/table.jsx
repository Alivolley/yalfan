import { useRouter } from 'next/router';

// MUI
import { CircularProgress, FormControl, MenuItem, Pagination, Select, Tooltip } from '@mui/material';

// Assets
import TableStyle from './table.style';

function Table({
   columns,
   rows,
   pageStatus,
   setPageStatus,
   loading = false,
   totalPages,
   totalObjects,
   countValue,
   setCountValue,
}) {
   const { locale } = useRouter();

   const tableRowCalculator = (limit, page, index) => limit * page - (limit - 1) + index;

   return (
      <>
         <TableStyle>
            {loading ? (
               <div className="mt-10 flex items-center justify-center p-10">
                  <CircularProgress color="customPink" />
               </div>
            ) : rows?.length ? (
               <table>
                  <thead className="bg-[#f5f8fc]">
                     <tr>
                        {columns?.map(column => (
                           <th key={column?.id} className="text-center text-sm font-bold text-customBlue">
                              {column?.title}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {rows?.map((row, rowIndex) => (
                        <Tooltip
                           key={row?.id}
                           followCursor
                           title={
                              <div
                                 className="hidden items-center gap-2 px-1 customMd:flex"
                                 dir={locale === 'en' ? 'ltr' : 'rtl'}
                              >
                                 <p className="text-xs text-customBlue">زمان ثبت :</p>
                                 <p className="text-10 text-black">{row?.created}</p>
                              </div>
                           }
                        >
                           <tr>
                              {columns?.map((column, colIndex) =>
                                 colIndex === 0 ? (
                                    <td key={column?.id} className="text-center text-sm">
                                       {tableRowCalculator(countValue, pageStatus, rowIndex)}
                                    </td>
                                 ) : (
                                    <td key={column?.id} className="text-center text-sm">
                                       {!column?.renderCell ? row?.[column?.key] : column?.renderCell(row)}
                                    </td>
                                 )
                              )}
                           </tr>
                        </Tooltip>
                     ))}
                  </tbody>
               </table>
            ) : (
               <p className="py-20 text-center font-bold">جدول خالی می باشد</p>
            )}
         </TableStyle>
         {pageStatus && setPageStatus && totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-between gap-7">
               <div className="flex items-center gap-2">
                  <p className="text-sm text-textColor">نمایش</p>

                  <div className="min-w-[70px]">
                     <FormControl fullWidth size="small">
                        <Select
                           value={countValue}
                           onChange={e => {
                              setPageStatus(1);
                              setCountValue(e.target.value);
                           }}
                           color="customPink"
                        >
                           <MenuItem value={6}>6</MenuItem>
                           <MenuItem value={8}>8</MenuItem>
                           <MenuItem value={10}>10</MenuItem>
                           <MenuItem value={12}>12</MenuItem>
                           <MenuItem value={14}>14</MenuItem>
                        </Select>
                     </FormControl>
                  </div>
                  <p className="whitespace-nowrap text-sm text-textColor">از {totalObjects} عدد</p>
               </div>
               <Pagination
                  count={totalPages}
                  color="customPinkHigh"
                  onChange={(_, value) => setPageStatus(value)}
                  size="small"
                  page={pageStatus}
                  sx={{
                     '& .Mui-selected': {
                        color: 'white !important',
                     },
                  }}
               />
            </div>
         )}
      </>
   );
}

export default Table;
