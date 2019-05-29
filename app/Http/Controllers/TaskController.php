<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Task $task)
    {
        // get all tasks based on user id
        $allTasks = $task->whereIn('user_id', $request->user())->with('user');

        $tasks = $allTasks->orderBy('created_at', 'desc')->get();

        // return json object
        return response()->json([
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validation 

        $this->validate($request,
            [
                'name' => 'required |max:225',
            ]);
        // create new Tasks
        $task = $request->user()->tasks()->create(['name' => $request->name]);

        // return Task with user object
        return response()->json($task->with('user')->find($task->id));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //find task to update
        $task = Task::findOrFail($id);
        return response()->json([
            'task' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //update tasks that selected from edit method
        // save task in input
        $input = $request->all();
        // select tasks to update
        $task = Task::findOrFail($id);
        $task->update($input);
        return response()->json($task->with('user')->find($task->id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request)
    {
        $task = $request->user()->tasks()->where('id', $id)->delete();

        return response()->json([
                'status' => true]
        );
    }
}
