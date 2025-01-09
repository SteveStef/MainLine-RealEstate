'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <EditListingForm />
    </div>
  );
}

function EditListingForm() {
  const router = useRouter();

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");

  const handleSubmit = async (address, setAddress, idx) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateFeaturedListings?listing=${idx}&address=${address}`, { method: 'GET' });
      if (response.ok) {
        alert('Listing updated successfully!');
        setAddress("");
        router.refresh();
      } else {
        alert('Failed to update listing');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while updating the listing');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Featured Listings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <label htmlFor="fl1" className="block text-sm font-medium">
            Featured Listing 1
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              id="fl1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Enter address"
              className="flex-grow"
            />
            <Button 
              onClick={() => handleSubmit(address1, setAddress1, 0)}
              disabled={!address1}
            >
              Update
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <label htmlFor="fl2" className="block text-sm font-medium">
            Featured Listing 2
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              id="fl2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Enter address"
              className="flex-grow"
            />
            <Button 
              onClick={() => handleSubmit(address2, setAddress2, 1)}
              disabled={!address2}
            >
              Update
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <label htmlFor="fl3" className="block text-sm font-medium">
            Featured Listing 3
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              id="fl3"
              value={address3}
              onChange={(e) => setAddress3(e.target.value)}
              placeholder="Enter address"
              className="flex-grow"
            />
            <Button 
              onClick={() => handleSubmit(address3, setAddress3, 2)}
              disabled={!address3}
            >
              Update
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

