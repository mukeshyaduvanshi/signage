'use client';
import IconFacebook from '@/components/icon/icon-facebook';
import IconInstagram from '@/components/icon/icon-instagram';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconLinkedin from '@/components/icon/icon-linkedin';
import IconListCheck from '@/components/icon/icon-list-check';
import IconSearch from '@/components/icon/icon-search';
import IconTwitter from '@/components/icon/icon-twitter';
import IconUser from '@/components/icon/icon-user';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import { Transition, Dialog } from '@headlessui/react';
import { forEach } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ComponentsDashboardOrders = () => {
    const [addOrderModal, setAddOrderModal] = useState<any>(false);
    const [itemRowCount, setItemRowCount] = useState(1);

    const increaseItemRowCount = () => {
        setItemRowCount(itemRowCount + 1);
        console.log(itemRowCount);
    };
    const [value, setValue] = useState<any>('list');
    // console.log(value);

    const [defaultParams] = useState({
        id: null,
        amt1: '',
        caddress: '',
        cemail: '',
        cgst: '',
        cmobile: '',
        cname: '',
        inst1: '',
        phone1: '',
        prod1: '',
        qty1: '',
        rate1: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
        console.log(params);
    };

    const closeModal = () => {
        setAddOrderModal(false);
        setItemRowCount(1);
    };

    const [search, setSearch] = useState<any>('');
    const [orderList] = useState<any>([
        {
            id: 1,
            caddress: 'Karol Bagh, New Delhi',
            cemail: 'nitin@mail.com',
            cgst: '07AMIPK8090N2ZC',
            cmobile: '9818866966',
            cname: 'Nitin Khandelwal',
            desc: [
                { inst: 'Black back', prod: 'Vynl', qty: '100', rate: '10' },
                { inst: 'Matte', prod: 'Lamination', qty: '100', rate: '5' },
            ],
            status: 'wip',
        },
        {
            id: 2,
            caddress: 'Patel Nagar, New Delhi',
            cemail: 'sunil@mail.com',
            cgst: '05AUYHE8749E1ZU',
            cmobile: '7042866966',
            cname: 'Sunil Ganju',
            desc: [
                { inst: '0-40', prod: 'Acrylic', qty: '50', rate: '20' },
                { prod: 'UV Printing', qty: '50', rate: '80' },
                { inst: 'Golden Frame', prod: 'Frame', qty: '30', rate: '10' },
                { inst: 'Wooden Easel Stand', prod: 'Easel Stand', qty: '1', rate: '800' },
                { inst: 'Pack in Tat Patti', prod: 'PPackaging', qty: '1', rate: '100' },
            ],
            status: 'completed',
        },
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(orderList);

    const searchorders = () => {
        setFilteredItems(() => {
            return orderList.filter((item: any) => {
                return item.cname.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    useEffect(() => {
        searchorders();
    }, [search]);

    const saveOrder = () => {
        if (!params.name) {
            showMessage('Name is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }
        if (!params.role) {
            showMessage('Occupation is required.', 'error');
            return true;
        }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.cname = params.cname;
            user.cmobile = params.cmobile;
            user.caddress = params.caddress;
            user.cemail = params.cemail;
        } else {
            //add user
            let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let user = {
                id: maxUserId + 1,
                path: 'profile-35.png',
                name: params.name,
                email: params.email,
                phone: params.phone,
                role: params.role,
                location: params.location,
                posts: 20,
                followers: '5K',
                following: 500,
            };
            filteredItems.splice(0, 0, user);
            //   searchorderss();
        }

        showMessage('User has been saved successfully.');
        setAddOrderModal(false);
    };

    const editOrder = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddOrderModal(true);
    };

    const deleteOrder = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage('User has been deleted successfully.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Orders</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editOrder()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add Order
                            </button>
                        </div>
                        {/* <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                                <IconListCheck />
                            </button>
                        </div> */}
                        {/* <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                                <IconLayoutGrid />
                            </button>
                        </div> */}
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Orders" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer Details</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((orders: any) => {
                                    return (
                                        <tr key={orders.id}>
                                            <td>
                                                <div className="flex w-max items-center">
                                                    <div>{orders.id}</div>
                                                </div>
                                            </td>
                                            <td>
                                                {orders.cname} <br /> {orders.cemail} <br /> {orders.cmobile}
                                            </td>
                                            <td className="whitespace-nowrap">
                                                {orders.desc
                                                    ? orders.desc.map((item: any) => (
                                                          <div key={item}>
                                                              {item.prod}-{item.inst} - {item.qty} @ {item.rate} = {(item.amt = item.rate * item.qty)}
                                                          </div>
                                                      ))
                                                    : 'N/A'}
                                            </td>
                                            <td className="whitespace-nowrap">{orders.desc.reduce((a: any, b: any) => a + b.amt, 0)}</td>
                                            <td className="whitespace-nowrap">{orders.status}</td>
                                            <td>
                                                <div className="flex items-center justify-center gap-4">
                                                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editOrder(orders)}>
                                                        Edit
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteOrder(orders)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Transition appear show={addOrderModal} as={Fragment}>
                <Dialog as="div" open={addOrderModal} onClose={() => setAddOrderModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel w-full max-w-6xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">
                                        {params.id ? 'Edit Order' : 'Add Order'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="flex justify-around gap-4">
                                                <div className="mb-5 w-4/12">
                                                    <label htmlFor="cmobile">Customer Mobile</label>
                                                    <input
                                                        name="cmobile"
                                                        id="cmobile"
                                                        type="tel"
                                                        placeholder="Mobile number is must and will fill other customer details"
                                                        className="form-input"
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div>
                                                <div className="mb-5 w-full">
                                                    <label htmlFor="cname">Customer Name</label>
                                                    <input
                                                        name="cname"
                                                        id="cname"
                                                        type="text"
                                                        placeholder="Name will be fetched from mobile number or will be filled by user"
                                                        className="form-input"
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div>
                                                <div className="mb-5 w-3/12">
                                                    <label htmlFor="orderid">Order Id</label>
                                                    <input
                                                        name="orderid"
                                                        type="number"
                                                        placeholder="Automatic Order No from Length of Orders"
                                                        className="form-input  text-gray-400 dark:text-white-dark"
                                                        value={1}
                                                        disabled
                                                        // onChange={(e) => changeValue(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-around gap-4">
                                                <div className="mb-5 w-full">
                                                    <label htmlFor="cemail">Customer Email</label>
                                                    <input
                                                        name="cemail"
                                                        id="cemail"
                                                        type="email"
                                                        placeholder="Email will be fetched from mobile number or will be filled by user"
                                                        className="form-input"
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div>
                                                <div className="mb-5 w-full">
                                                    <label htmlFor="caddress">Customer Address</label>
                                                    <input
                                                        name="caddress"
                                                        id="caddress"
                                                        type="text"
                                                        placeholder="Address will be fetched from mobile number or will be filled by user"
                                                        className="form-input"
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div>
                                                <div className="mb-5 w-full">
                                                    <label htmlFor="cgst">GST Number</label>
                                                    <input
                                                        name="cgst"
                                                        id="cgst"
                                                        type="text"
                                                        placeholder="GST will be fetched from mobile number or will be filled by user"
                                                        className="form-input"
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="mt-4 flex justify-around gap-4">
                                                <table>
                                                    <thead>
                                                        <th className="w-1/12">SNO</th>
                                                        <th className="w-3/12 px-6 text-left">Product</th>
                                                        <th className="w-3/12 px-6 text-left">Instructions</th>
                                                        {/* <th>Width</th>
                                                        <th>Height</th> */}
                                                        <th className="w-1/12 ">Qty</th>
                                                        <th className="w-1/12 ">Rate</th>
                                                        <th className="w-1/12 ">Amount</th>
                                                    </thead>
                                                    <tbody>
                                                        {Array(itemRowCount)
                                                            .fill(0)
                                                            .map((_, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <input
                                                                            name={`sno${index + 1}`}
                                                                            id={`sno${index + 1}`}
                                                                            type="text"
                                                                            placeholder="OrderId-SNO"
                                                                            value={index + 1}
                                                                            className="form-input border-none text-gray-300"
                                                                            onChange={(e) => changeValue(e)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            name={`prod${index + 1}`}
                                                                            id={`prod${index + 1}`}
                                                                            type="text"
                                                                            placeholder="Autocomplete drodown to select elements (from Google Sheet)"
                                                                            className="form-input"
                                                                            onChange={(e) => changeValue(e)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            name={`inst${index + 1}`}
                                                                            id={`inst${index + 1}`}
                                                                            type="text"
                                                                            placeholder="Sace to capture Insstructions"
                                                                            className="form-input"
                                                                            onChange={(e) => changeValue(e)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            name={`qty${index + 1}`}
                                                                            id={`qty${index + 1}`}
                                                                            type="number"
                                                                            placeholder="Quantity"
                                                                            className="form-input"
                                                                            onChange={(e) => changeValue(e)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            name={`rate${index + 1}`}
                                                                            id={`rate${index + 1}`}
                                                                            type="number"
                                                                            placeholder="Rate"
                                                                            className="form-input"
                                                                            onChange={(e) => changeValue(e)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            name={`amt${index + 1}`}
                                                                            id={`amt${index + 1}`}
                                                                            type="number"
                                                                            placeholder="Amount"
                                                                            className="form-input"
                                                                            onChange={(e) => changeValue(e)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td className="text-right">
                                                                <span onClick={increaseItemRowCount} className="cursor-pointer text-xl text-orange-700">
                                                                    +row
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddOrderModal(false)}>
                                                    Cancel
                                                </button>

                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveOrder}>
                                                    {params.id ? 'Update' : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ComponentsDashboardOrders;
