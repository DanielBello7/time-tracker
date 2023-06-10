import { Dialog, Transition } from '@headlessui/react';
import { useModalData } from '../context/modal.context';
import React from 'react';

function ModalBody() {
    const { alert: toast } = useModalData();
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center">
            <Transition.Child
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                as={React.Fragment}
                enter="ease-out duration-300"
                leave="ease-in duration-200"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>

                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <Dialog.Title as="h2" className="mt-1 text-2xl leading-6 text-gray-900 font-bold">
                                    Alert
                                </Dialog.Title>
                                <div className="mt-1">
                                    <p className="text-sm text-gray-500">
                                        {toast.msg}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" />
                </Dialog.Panel>
            </Transition.Child>
        </div>
    )
}

export default function AlertModal() {
    const { alert: toast, ToggleAlert: ToggleToast } = useModalData();

    React.useEffect(() => {
        const timeout = setTimeout(() => ToggleToast(false), 2000);
        return () => clearTimeout(timeout);
    }, [toast.show]);

    return (
        <Transition.Root show={toast.show} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => ToggleToast(false)}>
                <Transition.Child
                    as={'div'}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ModalBody />
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}