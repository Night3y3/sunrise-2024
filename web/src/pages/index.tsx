import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useCallback, useEffect, useState, useMemo } from "react";
import Task from "@/model/Task";
import { fetchTasks, fetchActiveTasks, fetchCompletedTasks, handleTaskComplete } from "@/utils/fetch";
import debounce from "lodash.debounce";
import CustomCard from "@/components/CustomCard";
import React from "react";
import Title from "@/components/Title";
import TaskColumn from "@/components/TaskColumn";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const fetchAllTasks = useCallback(() => {
    setLoading(true);
    Promise.all([fetchTasks(), fetchActiveTasks(), fetchCompletedTasks()])
      .then(([allTasks, active, completed]) => {
        setTasks(allTasks);
        setActiveTasks(active);
        setCompletedTasks(completed);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const debouncedFetchAllTasks = debounce(() => {
      fetchAllTasks();
    }, 2000);

    debouncedFetchAllTasks();
    return () => {
      debouncedFetchAllTasks.cancel();
    };
  }, [fetchAllTasks]);

  const memoizedTasks = useMemo(() => tasks, [tasks]);
  const memoizedActiveTasks = useMemo(() => activeTasks, [activeTasks]);
  const memoizedCompletedTasks = useMemo(() => completedTasks, [completedTasks]);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <nav className="py-4 px-12 text-2xl bg-white flex justify-between">
        <h3 className=" text-black">Task Board</h3>
      </nav>
      <div className="mx-12 grid grid-cols-3 gap-6 bg-[#F3F6F8]">
        <TaskColumn
          title="To-Do"
          tasks={memoizedTasks}
          className="bg-[#D9D9D9]"
          setTasks={setTasks}
          setActiveTasks={setActiveTasks}
          setCompletedTasks={setCompletedTasks}
        />
        <TaskColumn
          title="In Progress"
          tasks={memoizedActiveTasks}
          className="bg-[#E6F7FF] text-[#1890FF]"
          setTasks={setTasks}
          setActiveTasks={setActiveTasks}
          setCompletedTasks={setCompletedTasks}
        />
        <TaskColumn
          title="Completed"
          tasks={memoizedCompletedTasks}
          className="bg-[#52C41A] text-white"
          setTasks={setTasks}
          setActiveTasks={setActiveTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </>
  );
}