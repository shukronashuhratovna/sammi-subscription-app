import { Subscription } from "src/interfaces/app.interface";
import moment from "moment";
import { useState } from "react";

const MembershipPlan = ({ subscription }: MembershipPlanProps) => {
    console.log(subscription);

    const openPortal = async () => {
        const payload = { user_id: subscription.customer.metadata.user_id }
        const response = await fetch('/api/subscription/manage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        const data = await response.json();
        window.open(data.portal);

    }


    return (
        <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:bordder-x-0 md:border-t md:border-b-0 md:pb-0'>
            <div className='space-y-2 py-4'>
                <h4 className='text-lg text-[gray]'>Membership & Billing</h4>
                <button onClick={openPortal} className='h-10 w-3/5 transition-all whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5'>
                    Cancel Membership
                </button>
            </div>

            <div className='col-span-3'>
                <div className='flex flex-col justify-between border-b border-white/10 py-4 md:flex-row'>
                    <div>
                        <p className='font-medium'>{subscription.customer.email}</p>
                        <p className='text-[gray]'>Password: ******</p>
                    </div>
                    <div className='md:text-right'>
                        <p className={'membershipLink'}>Change email</p>
                        <p className={'membershipLink'}>Change password</p>
                    </div>
                </div>

                <div className='flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0'>
                    <div>
                        <div>
                            <p className="flex items-center gap-2 pb-2">
                                <span className="bg-gray-600 py-1 uppercase px-2 rounded">
                                    {subscription.default_payment_method
                                        ? subscription.default_payment_method.card.brand
                                        : subscription.customer.invoice_settings.default_payment_method.card.brand}</span>
                                **** **** **** {subscription.default_payment_method
                                    ? subscription.default_payment_method.card.last4
                                    : subscription.customer.invoice_settings.default_payment_method.card.last4}
                            </p>

                        </div>
                        <p>Your next billing date {moment(subscription.current_period_end * 1000).format('DD MMM, yyyy')}</p>
                    </div>
                    <div className='md:text-right'>
                        <p className='membershipLink'>Manage payment info</p>
                        <p className='membershipLink'>Add backup payment method</p>
                        <p className='membershipLink'>Billing detail</p>
                        <p className='membershipLink'>Change billing day</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipPlan;

interface MembershipPlanProps {
    subscription: Subscription;
}