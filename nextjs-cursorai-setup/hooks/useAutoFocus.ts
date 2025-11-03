/** @format */

import { InputRef } from "antd";
import { useEffect, useRef } from "react";

export const useAutoFocus = (condition: boolean, delay: number = 100) => {
    const ref = useRef<InputRef>(null);

    useEffect(() => {
        if (condition && ref.current) {
            const timer = setTimeout(() => {
                ref.current?.focus?.();
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [condition, delay]);

    return ref;
};
