import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { CheckSquare, Square } from "lucide-react";

interface SelfReviewChecklistProps {
  checklist: string[];
  onSubmit: () => void;
  onGoBack: () => void;
}

export const SelfReviewChecklist: React.FC<SelfReviewChecklistProps> = ({
  checklist,
  onSubmit,
  onGoBack,
}) => {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(checklist.length).fill(false)
  );

  const toggleCheck = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const allChecked = checked.every((c) => c);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Revisa tu Historia
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Antes de enviar, verifica que tu historia cumpla con estos criterios:
        </p>

        <div className="space-y-4 mb-8">
          {checklist.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleCheck(index)}
              className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-purple-400 cursor-pointer transition-colors"
            >
              {checked[index] ? (
                <CheckSquare
                  className="text-green-600 flex-shrink-0"
                  size={24}
                />
              ) : (
                <Square className="text-gray-400 flex-shrink-0" size={24} />
              )}
              <span
                className={`text-base ${
                  checked[index] ? "text-gray-800 font-medium" : "text-gray-600"
                }`}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onGoBack}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Volver a Editar
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!allChecked}
            size="lg"
            className="flex-1"
          >
            Enviar Historia
          </Button>
        </div>

        {!allChecked && (
          <p className="text-sm text-orange-600 text-center mt-4">
            Marca todos los criterios para poder enviar tu historia
          </p>
        )}
      </Card>
    </motion.div>
  );
};
