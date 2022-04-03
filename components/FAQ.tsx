import { Grid, Divider, Spacer } from "@nextui-org/react";
import { Disclosure, Transition } from '@headlessui/react'
import { BsChevronUp } from "react-icons/bs";

const FAQ = () => {
    return(
        <section id="FAQ">
            <Grid.Container className="place-items-start" gap={4}>
                <Grid 
                    xs={12} 
                    sm={12} 
                    md={6} 
                    lg={6}>
                    <h1 className="text-center md:text-left font-normal leading-snug text-7xl">
                        You got <i>questions</i>, we've got <i>answers</i>.
                    </h1>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={6}>
                    <div className="w-full">
                        <Divider/>
                        <Spacer/>

                        <Disclosure>
                        {({ open }) => (
                            <>
                            <Disclosure.Button className="flex justify-between w-full py-2 text-lg font-medium text-left">
                                <span className="text-2xl font-normal">WTF is Stork Drops?</span>
                                <BsChevronUp
                                className={`${
                                    open ? 'transform rotate-180' : ''
                                } w-5 h-5 text-gray-500`}
                                />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-250 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0">
                                <Disclosure.Panel className="text-lg py-4 text-gray-500">
                                    Stork Drops is a collection of [number] membership cards that 
                                    give you the highest access within our Stork Drops platform. 
                                    A place where you can collect various token drops, 
                                    gain access to whitelists, and holder-only chatrooms.
                                </Disclosure.Panel>
                            </Transition>
                            </>
                            )}
                        </Disclosure>

                        <Spacer/>
                        <Divider/>
                        <Spacer/>

                        <Disclosure>
                        {({ open }) => (
                            <>
                            <Disclosure.Button className="flex justify-between w-full py-2 text-lg font-medium text-left">
                                <span className="text-2xl font-normal">Who's the team behind Stork Drops?</span>
                                <BsChevronUp
                                className={`${
                                    open ? 'transform rotate-180' : ''
                                } w-5 h-5 text-gray-500`}
                                />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-250 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0">
                                <Disclosure.Panel className="text-lg py-4 text-gray-500">
                                    Stork Drops core team (for now) is comprised of three friends
                                    who met through the crypto hardware industry and have been working together
                                    for 3+ years.
                                </Disclosure.Panel>
                            </Transition>
                            </>
                            )}
                        </Disclosure>
                        
                        <Spacer/>
                        <Divider/>
                        <Spacer/>

                        <Disclosure>
                        {({ open }) => (
                            <>
                            <Disclosure.Button className="flex justify-between w-full py-2 text-lg font-medium text-left">
                                <span className="text-2xl font-normal">When does minting begin?</span>
                                <BsChevronUp
                                className={`${
                                    open ? 'transform rotate-180' : ''
                                } w-5 h-5 text-gray-500`}
                                />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-250 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0">
                                <Disclosure.Panel className="text-lg py-4 text-gray-500">
                                    We don't have a formal release date yet, but you will get notified well ahead of time to prepare.
                                    Announcements will go live after whitelist events have ended. 
                                    All information can be found on our <a className="text-purple-500 mr-1" href="#">Twitter.</a>
                                </Disclosure.Panel>
                            </Transition>
                            </>
                            )}
                        </Disclosure>

                        <Spacer/>
                        <Divider/>
                        <Spacer/>

                        <Disclosure>
                        {({ open }) => (
                            <>
                            <Disclosure.Button className="flex justify-between w-full py-2 text-lg font-medium text-left">
                                <span className="text-2xl font-normal">Who can mint one?</span>
                                <BsChevronUp
                                className={`${
                                    open ? 'transform rotate-180' : ''
                                } w-5 h-5 text-gray-500`}
                                />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-250 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0">
                                <Disclosure.Panel className="text-lg py-4 text-gray-500">
                                    Initial distribution will be reserved to those who have been whitelisted
                                    and assigned a <i>Stork OG</i> role inside our Discord channel. You can learn
                                    more about how to get whitelisted via <a className="text-purple-500 mr-1" href="#">Twitter.</a>
                                    After the whitelist period the remaining distribution will be through general release.
                                </Disclosure.Panel>
                            </Transition>
                            </>
                            )}
                        </Disclosure>
                    </div>
                </Grid>
            </Grid.Container>
        </section>
    )
}

export default FAQ