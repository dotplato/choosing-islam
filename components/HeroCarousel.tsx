'use client';

import * as React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';

const heroImages = [
    'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2000&auto=format&fit=crop',
];

export default function HeroCarousel() {
    const [api, setApi] = React.useState<CarouselApi>();

    React.useEffect(() => {
        if (!api) {
            return;
        }

        const intervalId = setInterval(() => {
            api.scrollNext();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [api]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <Carousel
                setApi={setApi}
                className="w-full h-full"
                opts={{
                    loop: true,
                    align: 'start',
                }}
            >
                <CarouselContent className="-ml-0 h-full">
                    {heroImages.map((src, index) => (
                        <CarouselItem key={index} className="pl-0 h-full w-full basis-full">
                            <div className="relative w-full h-full">
                                <Image
                                    src={src}
                                    alt={`Hero Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                {/* test code */}
                                <div className="absolute inset-0 bg-black/40" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
