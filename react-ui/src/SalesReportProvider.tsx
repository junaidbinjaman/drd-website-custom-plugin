// 'use client';

// import type {ReactNode} from 'react';
// import {SalesReportContext} from '@/context/SalesReportDataContext/SalesReportDataContext';
// import {startOfMonth} from 'date-fns';

// export default function SalesReportProvider({children}: {children: ReactNode}) {
//     const startDateOfCurrentMonth = startOfMonth(new Date());
//     const todaysDate = new Date();

//     return (
//         <SalesReportContext.Provider
//             value={{
//                 startDate: startDateOfCurrentMonth,
//                 endDate: todaysDate,
//                 dateType: 'monthToDate',
//             }}
//         >
//             {children}
//         </SalesReportContext.Provider>
//     );
// }
