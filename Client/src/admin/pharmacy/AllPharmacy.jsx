import React from 'react';
import useFetch from '../../hooks/useFetch';
import pharmacyServices from '../../services/pharmacyService';
import { PharmacyCard } from '../../components/card';

const AllPharmacy = () => {
  const { isLoading, isError, responsData: pharmacyData, messsageError } = useFetch(pharmacyServices.getPharmacy);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{messsageError}</div>;
  }

  return (
    <div>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
        {pharmacyData &&
          pharmacyData.map((pharmacy) => {
            return <PharmacyCard pharmacy={pharmacy} key={pharmacy._id} />;
          })}
      </div>
    </div>
  );
};

export default AllPharmacy;
