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

export default function Home() {
  return (
    <div className="bg-white flex justify min-h-screen">
      <Head>
        <title>Profil Bisnis</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold mb-6">Profil Bisnis</h1>
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-8">
            <Card className="w-36 h-36 border rounded-md mb-2">
              <CardContent className="flex justify-center items-center h-full">
                <i className="fas fa-image text-gray-400 text-4xl"></i>
              </CardContent>
            </Card>
            <Button variant="link" className="text-sm text-gray-500">Change</Button>
          </div>
          <div>
            <h2 className="text-xl font-bold">Toko XYZ</h2>
            <p className="text-gray-600">Kode : TXYZ</p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Informasi Usaha</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha</Label>
              <Input className="w-full border rounded-md p-2" type="text" />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Alamat Usaha</Label>
              <Input className="w-full border rounded-md p-2" type="text" />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Email Usaha</Label>
              <Input className="w-full border rounded-md p-2" type="email" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Informasi Pembayaran</h2>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-8">
              <Card className="w-36 h-36 border rounded-md mb-2">
                <CardContent className="flex justify-center items-center h-full">
                  <i className="fas fa-qrcode text-gray-400 text-4xl"></i>
                </CardContent>
              </Card>
              <Button className="text-white px-4 py-2 rounded-md">Upload QR</Button>
            </div>
            <div className="w-full">
              <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700 mb-1">Nomor Rekening Usaha</Label>
                <Input className="w-full border rounded-md p-2" type="text" />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Atas Nama Rekening</Label>
                <Input className="w-full border rounded-md p-2" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}