import Head from 'next/head';
import {Button,} from '@/components/ui/button';
import {Input,} from '@/components/ui/input';
import {Label,} from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'; 
import BusinessProfileForm from './ui/form';

export default async function BusinessProfileOverviewPage() {
  // const {data: categories} = await getCategories();
  // const count = products?.length

  return (
    <>
      <BusinessProfileForm></BusinessProfileForm>
    </>
  )
}
