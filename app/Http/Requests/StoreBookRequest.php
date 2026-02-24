<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id'  => ['required', 'exists:categories,id'],
            'title'        => ['required', 'string', 'max:200'],
            'author'       => ['required', 'string', 'max:150'],
            'isbn'         => ['nullable', 'string', 'max:20', 'unique:books,isbn'],
            'price'        => ['required', 'numeric', 'min:0.01'],
            'stock'        => ['required', 'integer', 'min:0'],
            'status'       => ['nullable', 'in:disponible,agotado'],
            'description'  => ['nullable', 'string'],
            'cover_image'  => ['nullable', 'image', 'max:2048'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio.',
            'author.required' => 'El autor es obligatorio.',
            'isbn.required' => 'El ISBN es obligatorio.',
            'isbn.unique' => 'Este ISBN ya está registrado.',
            'stock.min' => 'El stock no puede ser negativo.',
            'price.min' => 'El precio no puede ser negativo.',
            'category_id.required' => 'La categoría es obligatoria.',
            'category_id.exists' => 'La categoría seleccionada no existe.',
        ];
    }
}
