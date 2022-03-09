import { useState } from 'react';
import { useAuth } from 'context/AuthContext';
import { useFirestore } from 'context/FirestoreContext';
import { useRouter } from 'next/router';
import Chart from 'components/chart';

export default function CollectionItem() {
  const router = useRouter();
  const { watchlist } = useFirestore();
  const collection = watchlist.find(
    (i) => i.token_address === router.query.address[0]
  );

  console.log(collection);
  return (
    <section>
      <div>
        <Chart />
      </div>
      <div>img</div>
    </section>
  );
}
