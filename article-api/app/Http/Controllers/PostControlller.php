<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostControlller extends Controller
{
    public function createArticle(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $model = new Post;
        $model->title = $request->title;
        $model->content = $request->content;
        $model->save();
        return response()->json(['message' => 'Article created successfully'], 201);
    }

    public function getArticle(){
        $posts = Post::orderBy('created_at', 'desc')->get();
        return response()->json([$posts]);
    }

    public function deleteArticle(Request $request){
        $post = Post::find($request->id);
        if (!$post) {
            return response()->json(['message' => 'Article not found'], 404);
        }
        $post->delete();
        return response()->json(['message' => 'Article deleted successfully'], 200);
    }

    public function updateArticle(Request $request){
        $post = Post::find($request->id);
        if (!$post) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->title = $request->title;
        $post->content = $request->content;
        $post->save();

        return response()->json(['message' => 'Article updated successfully'], 200);
    }

    public function latestArticle()
{
    $post = Post::orderBy('created_at', 'desc')->first();

    if (!$post) {
        return response()->json(['message' => 'No posts found'], 404);
    }

    return response()->json($post, 200);
}
}
