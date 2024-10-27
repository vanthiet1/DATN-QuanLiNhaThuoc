import useFetch from '../../hooks/useFetch';
import pharmacyServices from '../../services/pharmacyService';
import { PharmacyCard } from '../../components/card';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';

const pharamcyBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All pharmacy'
  }
];

const PharmacyShowWrapper = () => {
  const { isLoading, isError, responsData: pharmacyData, messageError } = useFetch(pharmacyServices.getPharmacy);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{messageError}</div>;
  }
  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      {pharmacyData &&
        pharmacyData.map((pharmacy) => {
          return <PharmacyCard pharmacy={pharmacy} key={pharmacy._id} />;
        })}
    </div>
  );
};

const AllPharmacy = () => {
  return (
    <div>
      <SectionWrapper title='All pharmacy' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={pharamcyBreadCrumbs} />
        <PharmacyShowWrapper />
      </SectionWrapper>
    </div>
  );
};

export default AllPharmacy;
