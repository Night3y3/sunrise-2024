import Task from '@/model/Task';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CheckIcon from '@mui/icons-material/Check';
import Card from "@mui/material/Card";
import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CardProps {
    disabled?: boolean;
    task: Task;
    handleTaskComplete: (title: string) => void;
    columnTitle: string;
}

const CustomCard: React.FC<CardProps> = ({ disabled, task, handleTaskComplete, columnTitle }) => {
    return (
        <Box sx={{ maxWidth: 275 }}>
            <Card variant="outlined" sx={{ minHeight: 200 }}>
                <CardHeader title={`Task ${task.id}`} action={columnTitle === "Completed" ? null : (
                    <Button
                        size="small"
                        variant="contained"
                        disabled={disabled}
                        onClick={() => handleTaskComplete(task.title)}
                    >
                        <CheckIcon /> Done
                    </Button>
                )}
                />
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} fontWeight={"medium"} gutterBottom>
                        {task.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: 'text.secondary' }} gutterBottom>
                        {task.description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default CustomCard;