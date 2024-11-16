'use client';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import IconUser from '@/components/icon/icon-user';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import IconPhoneCall from '../icon/icon-phone-call';

const ComponentsAuthRegisterForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<any>();

    const handleInput = (e: any) => {
        // const { name, value } = e.target;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // console.log(formData);

    const saveUser = async () => {
        const res = await fetch(`/api/userbase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // sending data as body
            body: JSON.stringify(formData),
        });
        //getting response from server
        const jsonData = await res.json();
        // if in response from server we get path we redirect to that path
        jsonData.path ? router.push(jsonData.path) : null;
        // if in response from server we get data we set userId in localstorage
        jsonData.data ? localStorage.setItem('userId', jsonData.data) : null;
        // console.log(jsonData);
    };

    return (
        <form className="space-y-5 dark:text-white">
            <div>
                <label htmlFor="Name">Name</label>
                <div className="relative text-white-dark">
                    <input onChange={handleInput} name="name" id="Name" type="text" placeholder="Enter Full Name" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconUser fill={true} />
                    </span>
                </div>
            </div>
            <div>
                <label htmlFor="Email">Email</label>
                <div className="relative text-white-dark">
                    <input onChange={handleInput} name="email" id="Email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconMail fill={true} />
                    </span>
                </div>
            </div>
            <div>
                <label htmlFor="Mobile">Mobile</label>
                <div className="relative text-white-dark">
                    <input onChange={handleInput} name="mobile" id="Mobile" type="tel" placeholder="Enter Mobile Number" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconPhoneCall fill={true} />
                    </span>
                </div>
            </div>
            <div>
                <label htmlFor="Password">Password</label>
                <div className="relative text-white-dark">
                    <input onChange={handleInput} name="password" id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots fill={true} />
                    </span>
                </div>
            </div>
            <button type="button" onClick={saveUser} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                Sign Up
            </button>
        </form>
    );
};

export default ComponentsAuthRegisterForm;
