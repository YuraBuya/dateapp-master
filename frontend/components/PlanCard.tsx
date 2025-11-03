/** @format */

// import { ReactNode } from 'react' // unused
import { motion } from "framer-motion";
import { Check, Crown, Sparkles } from "lucide-react";

interface PlanFeature {
    text: string;
    included: boolean;
}

interface PlanCardProps {
    name: string;
    price: string;
    period: string;
    features: PlanFeature[];
    color: "pink" | "mint" | "purple";
    isPopular?: boolean;
    isPremium?: boolean;
    onSelect: () => void;
}

const colorStyles = {
    pink: {
        gradient: "from-pink-100 to-rose-100",
        border: "border-pink-200",
        badge: "bg-gradient-to-r from-pink-500 to-rose-500",
        button: "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
        icon: "text-pink-500",
    },
    mint: {
        gradient: "from-emerald-100 to-teal-100",
        border: "border-emerald-200",
        badge: "bg-gradient-to-r from-emerald-500 to-teal-500",
        button: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
        icon: "text-emerald-500",
    },
    purple: {
        gradient: "from-slate-900 to-gray-900",
        border: "border-slate-700",
        badge: "bg-gradient-to-r from-yellow-400 to-orange-500",
        button: "bg-gradient-to-r from-white to-gray-100 hover:from-gray-50 hover:to-white text-gray-900",
        icon: "text-yellow-500",
    },
};

export default function PlanCard({
    name,
    price,
    period,
    features,
    color,
    isPopular = false,
    isPremium = false,
    onSelect,
}: PlanCardProps) {
    const styles = colorStyles[color];
    const isDark = color === "purple";

    return (
        <motion.div
            className={`
        relative rounded-3xl p-6 border transition-all duration-500 cursor-pointer
        ${
            isDark
                ? `${styles.gradient} ${styles.border} text-white`
                : `bg-gradient-to-br ${styles.gradient} ${styles.border} text-gray-800`
        }
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:scale-105
      `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            onClick={onSelect}
        >
            {/* Popular Badge */}
            {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div
                        className={`${styles.badge} text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}
                    >
                        <Sparkles className="w-3 h-3" />
                        인기
                    </div>
                </div>
            )}

            {/* Premium Crown */}
            {isPremium && (
                <div className="absolute -top-2 -right-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-white" />
                    </div>
                </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
                <h3
                    className={`text-xl font-bold mb-2 ${
                        isDark ? "text-white" : "text-gray-800"
                    }`}
                >
                    {name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                    <span
                        className={`text-3xl font-bold ${
                            isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                        {price}
                    </span>
                    <span
                        className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                    >
                        / {period}
                    </span>
                </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div
                            className={`
              w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0
              ${
                  feature.included
                      ? isDark
                          ? "bg-emerald-500"
                          : "bg-emerald-100"
                      : "bg-gray-200"
              }
            `}
                        >
                            {feature.included && (
                                <Check
                                    className={`w-3 h-3 ${
                                        isDark
                                            ? "text-white"
                                            : "text-emerald-600"
                                    }`}
                                />
                            )}
                        </div>
                        <span
                            className={`
              text-sm leading-5
              ${
                  feature.included
                      ? isDark
                          ? "text-white"
                          : "text-gray-700"
                      : "text-gray-400 line-through"
              }
            `}
                        >
                            {feature.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* Select Button */}
            <motion.button
                className={`
          w-full h-12 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-semibold tracking-wide shadow-lg
          ${styles.button}
        `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSelect}
            >
                시작하기
            </motion.button>
        </motion.div>
    );
}
