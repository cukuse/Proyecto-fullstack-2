package com.example.demo.controller;


import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public List<Producto> listar() {
        return productoRepository.findAll();
    }

    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setTitulo(productoActualizado.getTitulo());
                    producto.setAforo(productoActualizado.getAforo());
                    producto.setPrecio(productoActualizado.getPrecio());
                    producto.setPrecioAnterior(productoActualizado.getPrecioAnterior());
                    producto.setImagen(productoActualizado.getImagen());
                    producto.setStock(productoActualizado.getStock());
                    producto.setCategoria(productoActualizado.getCategoria());
                    producto.setOferta(productoActualizado.getOferta());
                    return productoRepository.save(producto);
                }).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }
}

