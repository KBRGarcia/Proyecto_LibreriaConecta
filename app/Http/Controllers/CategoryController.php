<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\ActionLog;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories (admin).
     */
    public function index(Request $request)
    {
        $categories = Category::withCount('books')
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());

        ActionLog::log(
            auth()->id(),
            'INSERT',
            'categories',
            $category->id,
            "Categoría '{$category->name}' creada",
            $request->ip()
        );

        return redirect()->route('admin.categories.index')
            ->with('success', 'Categoría creada exitosamente.');
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        ActionLog::log(
            auth()->id(),
            'UPDATE',
            'categories',
            $category->id,
            "Categoría '{$category->name}' actualizada",
            $request->ip()
        );

        return redirect()->route('admin.categories.index')
            ->with('success', 'Categoría actualizada exitosamente.');
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category)
    {
        if ($category->books()->count() > 0) {
            return back()->withErrors(['category' => 'No se puede eliminar una categoría que tiene libros asociados.']);
        }

        $name       = $category->name;
        $categoryId = $category->id;
        $category->delete();

        ActionLog::log(
            auth()->id(),
            'DELETE',
            'categories',
            $categoryId,
            "Categoría '{$name}' eliminada",
            request()->ip()
        );

        return redirect()->route('admin.categories.index')
            ->with('success', 'Categoría eliminada exitosamente.');
    }
}
