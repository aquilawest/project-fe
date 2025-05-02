"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {Button} from "@/components/ui/Button";
import Logo from '@/public/globe.svg'

export default function AddUserPage() {
    const [restaurantImage, setRestaurantImage] = useState(null);
    const [ownerNIDFile, setOwnerNIDFile] = useState({ name: "yournid.pdf" });
    const [businessLicenseFile, setBusinessLicenseFile] = useState(null);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            restaurantName: "",
            representativeName: "",
            phoneNumber: "",
            established: "",
            workingPeriod: "9:00 AM - 10:00 PM",
            largePayment: "Cash in hand",
            location: ""
        }
    });

    const workingPeriodOptions = [
        { value: "9:00 AM - 10:00 PM", label: "9:00 AM - 10:00 PM" },
        { value: "8:00 AM - 9:00 PM", label: "8:00 AM - 9:00 PM" },
        { value: "10:00 AM - 11:00 PM", label: "10:00 AM - 11:00 PM" },
        { value: "24 hours", label: "24 hours" }
    ];

    const paymentOptions = [
        { value: "Cash in hand", label: "Cash in hand" },
        { value: "Bank transfer", label: "Bank transfer" },
        { value: "Credit card", label: "Credit card" },
        { value: "Mobile payment", label: "Mobile payment" }
    ];

    const onSubmit = (data:any) => {
        // Combine form data with files
        const formData = {
            ...data,
            restaurantImage,
            ownerNIDFile,
            businessLicenseFile
        };

        console.log("Form submitted:", formData);
        // Here you would typically send this data to your API
    };

    const handleImageUpload = () => {
        // This would typically trigger a file input click
        document.getElementById("restaurantImageInput").click();
    };

    const handleFileChange = (e:any, setterFunction:any) => {
        if (e.target.files && e.target.files[0]) {
            setterFunction(e.target.files[0]);
        }
    };

    const removeImage = () => {
        setRestaurantImage(null);
    };

    return (
        <div className={'py-20 container mx-auto px-4'}>
            <div className="  p-6 bg-white rounded-lg">
                <div className="mb-8">
                    <h1 className="text-2xl  flex items-center text-gray-500 font-bold">
                        <div className="w-1 h-8 bg-green-500 mr-3"></div>
                         Users Details
                    </h1>
                </div>

              <div className={'flex flex-col gap-4 justify-center'}>
                  <Image src={Logo}
                         alt={'P'}
                        width={200}
                         height={200}
                         objectFit={'cover'}
                         className={'self-center'}
                  />

                  <div className={'text-center '}>
                      <h2 className={'font-bold text-2xl'}>Oluwatayo David</h2>
                      <h3 >oluwatayodavid@gmail.com</h3>
                  </div>

                  <Button title={'Edit'} className={'bg-green-500 py-2 px-10 text-white mx-auto'}>
Edit user
                  </Button>


                  <div>
                      <div className={'text-start  mb-4 '}>
                          <p className={'text-gray-400 text-md'}>phone number</p>
                          <p className={'text-lg font-bold '}>+1239030213152</p>
                      </div>

                      <hr/>


                      <div className={'text-start  mb-4 '}>
                          <p className={'text-gray-400 text-md'}>University</p>
                          <p className={'text-lg font-bold '}>veritas university</p>
                      </div>


                      <hr/>

                      <div className={'text-start  mb-4 '}>
                          <p className={'text-gray-400 text-md'}>Location</p>
                          <p className={'text-lg font-bold '}>Bwari</p>
                      </div>


                  </div>
              </div>
            </div>
        </div>
    );
}