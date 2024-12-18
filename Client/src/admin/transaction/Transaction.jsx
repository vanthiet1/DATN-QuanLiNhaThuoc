import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import TransactionAllTable from './components/TransactionAllTable';
import { createContext, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import transactionServices from '../../services/transactionService';

const transactionsBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Tất cả giao dịch'
  }
];

const TransactionContext = createContext();
const TransactionProvider = ({ children }) => {
  const {
    responsData: transactionData,
    isLoading,
    isError,
    messageError
  } = useFetch(transactionServices.getAllTransaction);
  console.log(transactionData);
  if (isError) {
    return <div>{messageError}</div>;
  }

  if (isLoading) {
    return <div>Loadding...</div>;
  }

  return <TransactionContext.Provider value={{ isLoading, transactionData }}>{children}</TransactionContext.Provider>;
};

const SectionWrappTable = () => {
  const { transactionData } = useContext(TransactionContext);
  return <TransactionAllTable data={transactionData} />;
};

const Transaction = () => {
  return (
    <div>
      <TransactionProvider>
        <SectionWrapper title='Tất cả giao dịch' addClassNames={{ wrapper: 'mt-2' }}>
          <BreadCrumb crumbsData={transactionsBreadCrumb} />
          <SectionWrappTable />
        </SectionWrapper>
      </TransactionProvider>
    </div>
  );
};

export default Transaction;
