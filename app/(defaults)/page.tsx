import ComponentsDashboardOrders from '@/components/dashboard/components-dashboard-orders';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Croma',
};

const Sales = () => {
    return <ComponentsDashboardOrders />;
};

export default Sales;
