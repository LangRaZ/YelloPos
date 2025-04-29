import { getUserBusinessProfileId } from '@/lib/supabase/api_server';
import { getBusinessProfile } from '@/lib/supabase/api';
import BusinessProfileForm from './ui/form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Business Profile"
};

export default async function BusinessProfileOverviewPage() {
  
  const id = await getUserBusinessProfileId()
  const BusinessProfile = await getBusinessProfile(id)

  return (
    <>
      <BusinessProfileForm id={id} data={BusinessProfile.data}/>
    </>
  )
}
