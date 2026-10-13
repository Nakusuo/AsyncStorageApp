package com.example.asyncstorageapp

import android.content.Context
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    // Nombre del archivo de preferencias locales
    private val PREF_NAME = "MisPreferenciasApp"
    private val KEY_DATO = "clave_dato_guardado"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val etDato = findViewById<EditText>(R.id.etDato)
        val btnGuardar = findViewById<Button>(R.id.btnGuardar)
        val btnLeer = findViewById<Button>(R.id.btnLeer)
        val tvResultado = findViewById<TextView>(R.id.tvResultado)

        // 1. Cargar automáticamente el dato si ya existía previamente al abrir la app
        cargarDatoGuardado(tvResultado)

        // 2. Botón para Guardar el dato localmente
        btnGuardar.setOnClickListener {
            val textoAIngresar = etDato.text.toString()
            if (textoAIngresar.isNotBlank()) {
                val sharedPreferences = getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
                val editor = sharedPreferences.edit()
                editor.putString(KEY_DATO, textoAIngresar)
                editor.apply() // .apply() guarda los datos de forma asíncrona en segundo plano

                Toast.makeText(this, "¡Guardado con éxito!", Toast.LENGTH_SHORT).show()
                etDato.text.clear()
                cargarDatoGuardado(tvResultado)
            } else {
                Toast.makeText(this, "Por favor escribe algo", Toast.LENGTH_SHORT).show()
            }
        }

        // 3. Botón para Leer el dato manualmente
        btnLeer.setOnClickListener {
            cargarDatoGuardado(tvResultado)
        }
    }

    // Función auxiliar para leer desde el almacenamiento local
    private fun cargarDatoGuardado(textView: TextView) {
        val sharedPreferences = getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        // Si la clave no existe, devuelve "Ninguno"
        val datoRecuperado = sharedPreferences.getString(KEY_DATO, "Ninguno")
        textView.text = "Dato almacenado: $datoRecuperado"
    }
}
