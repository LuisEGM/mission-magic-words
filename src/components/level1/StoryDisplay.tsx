import React from "react";
import { motion } from "framer-motion";
import { Book } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import type { Story } from "../../types";

interface StoryDisplayProps {
  story: Story;
  onStartQuestions: () => void;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({
  story,
  onStartQuestions,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-purple-600" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">{story.title}</h2>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
            {story.text}
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Button onClick={onStartQuestions} size="lg">
          Comenzar Preguntas
        </Button>
      </div>
    </motion.div>
  );
};
