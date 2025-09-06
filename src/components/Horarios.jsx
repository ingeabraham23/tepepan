import React, { useState, useRef } from "react";
import "./Horarios.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // 👈 importa la función
import html2canvas from "html2canvas";

const Horarios = () => {
    const [fecha, setFecha] = useState(new Date());

    const tablaRef = useRef(null);

    // Función para dar formato a la fecha
    const formatearFecha = (fecha) => {
        return new Intl.DateTimeFormat("es-MX", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(fecha);
    };

    // Calcular número de semana basado en la fecha seleccionada
    const getNumeroSemana = (fecha) => {
        const fechaCopia = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

        // Día de la semana: 0 = domingo, 1 = lunes
        let diaSemana = fechaCopia.getDay();
        if (diaSemana === 0) diaSemana = 7; // Domingo pasa a 7

        // Fecha del lunes de esa semana
        const lunesSemana = new Date(fechaCopia);
        lunesSemana.setDate(fechaCopia.getDate() - diaSemana + 1);

        // Primer lunes del año
        const inicioAño = new Date(fechaCopia.getFullYear(), 0, 1);
        let primerDia = inicioAño.getDay();
        if (primerDia === 0) primerDia = 7; // Domingo pasa a 7
        const primerLunes = new Date(inicioAño);
        primerLunes.setDate(inicioAño.getDate() + (1 - primerDia));

        // Diferencia en días
        const diff = (lunesSemana - primerLunes) / (1000 * 60 * 60 * 24);

        // Número de semana
        return Math.floor(diff / 7) + 1;
    };


    const numeroSemana = getNumeroSemana(fecha) % 2; // 0 = par, 1 = impar

    function capturarTabla(tabla) {

        html2canvas(tabla).then(function (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `Horarios_Tepepan.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    }

    const horarios = [
        { sector: "Pavimento", teziu: "", tepe: "6:20", unidad: "08" },
        { sector: "Terracería", teziu: "", tepe: "6:30", unidad: "05" },
        {
            
            sector: numeroSemana === 1 ? "Pavimento" : "Pavimento",
            teziu: numeroSemana === 1 ? "" : "",
            tepe: numeroSemana === 1 ? "6:45" : "6:45",
            unidad: numeroSemana === 1 ? "15" : "02"
        },
        {
            
            sector: numeroSemana === 1 ? "Terracería" : "Terracería",
            teziu: numeroSemana === 1 ? "" : "",
            tepe: numeroSemana === 1 ? "7:00" : "7:00",
            unidad: numeroSemana === 1 ? "02" : "15"
        },
        { sector: "Pavimento", teziu: "6:50", tepe: "07:20", unidad: "08" },
        { sector: "Ambos", teziu: "7:00", tepe: "7:30", unidad: "05" },
        {

            sector: numeroSemana === 1 ? "Pavimento" : "Pavimento",
            teziu: numeroSemana === 1 ? "7:15" : "7:15",
            tepe: numeroSemana === 1 ? "7:45" : "7:45",
            unidad: numeroSemana === 1 ? "15" : "02"
        },
        {

            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "7:30" : "7:30",
            tepe: numeroSemana === 1 ? "8:00" : "8:00",
            unidad: numeroSemana === 1 ? "02" : "15"
        },
        { sector: "Ambos", teziu: "7:50", tepe: "8:25", unidad: "08" },
        {

            sector: numeroSemana === 1 ? "Terracería" : "Terracería",
            teziu: numeroSemana === 1 ? "8:25" : "8:25",
            tepe: numeroSemana === 1 ? "8:50" : "8:50",
            unidad: numeroSemana === 1 ? "15" : "02"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "9:00" : "9:00",
            tepe: numeroSemana === 1 ? "9:45" : "9:45",
            unidad: numeroSemana === 1 ? "02" : "15"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "9:50" : "9:50",
            tepe: numeroSemana === 1 ? "10:35" : "10:35",
            unidad: numeroSemana === 1 ? "15" : "02"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "10:45" : "10:45",
            tepe: numeroSemana === 1 ? "11:30" : "11:30",
            unidad: numeroSemana === 1 ? "02" : "15"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "11:35" : "11:35",
            tepe: numeroSemana === 1 ? "12:20" : "12:20",
            unidad: numeroSemana === 1 ? "15" : "02"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "12:20" : "12:20",
            tepe: numeroSemana === 1 ? "01:10" : "01:10",
            unidad: numeroSemana === 1 ? "02" : "15"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "01:00" : "01:00",
            tepe: numeroSemana === 1 ? "01:45" : "01:45",
            unidad: numeroSemana === 1 ? "15" : "02"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "01:55" : "01:55",
            tepe: numeroSemana === 1 ? "02:30" : "02:30",
            unidad: numeroSemana === 1 ? "02" : "15"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "02:35" : "02:35",
            tepe: numeroSemana === 1 ? "03:20" : "03:20",
            unidad: numeroSemana === 1 ? "15" : "02"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "03:15" : "03:15",
            tepe: numeroSemana === 1 ? "04:00" : "04:00",
            unidad: numeroSemana === 1 ? "02" : "15"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "04:00" : "04:00",
            tepe: numeroSemana === 1 ? "04:45" : "04:45",
            unidad: numeroSemana === 1 ? "15" : "02"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "04:45" : "04:45",
            tepe: numeroSemana === 1 ? "05:30" : "05:30",
            unidad: numeroSemana === 1 ? "02" : "15"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "05:35" : "05:35",
            tepe: numeroSemana === 1 ? "06:25" : "06:25",
            unidad: numeroSemana === 1 ? "15" : "02"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "06:05" : "06:05",
            tepe: numeroSemana === 1 ? "06:40" : "06:40",
            unidad: numeroSemana === 1 ? "02" : "15"
        },

        { sector: "Ambos", teziu: "06:30", tepe: "06:55", unidad: "08" },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "06:55" : "06:55",
            tepe: numeroSemana === 1 ? "07:25" : "07:25",
            unidad: numeroSemana === 1 ? "15" : "02"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "07:20" : "07:20",
            tepe: numeroSemana === 1 ? "07:40" : "07:40",
            unidad: numeroSemana === 1 ? "02" : "15"
        },

        { sector: "Ambos", teziu: "07:45", tepe: "", unidad: "08" },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "08:15" : "08:15",
            tepe: numeroSemana === 1 ? "" : "",
            unidad: numeroSemana === 1 ? "15" : "02"
        },

        {
            sector: numeroSemana === 1 ? "Ambos" : "Ambos",
            teziu: numeroSemana === 1 ? "08:40" : "08:40",
            tepe: numeroSemana === 1 ? "" : "",
            unidad: numeroSemana === 1 ? "02" : "15"
        },
    ];

    const generarPDF = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "letter" // tamaño carta
        });

        // Encabezado formal
        doc.setFont("times", "bold");
        doc.setFontSize(14);
        doc.text(
            "A todos nuestros usuarios que nos favorecen con su preferencia:",
            105,
            15,
            { align: "center" }
        );

        doc.setFont("times", "normal");
        doc.setFontSize(12);
        doc.text(
            "Se les informa que a partir del lunes 08 de septiembre entrarán en vigor los siguientes",
            105,
            22,
            { align: "center" }
        );
        doc.text(
            "horarios de Teziutlán con destino a Tepepan.",
            105,
            29,
            { align: "center" }
        );
        doc.text(
            "Les agradecemos su atención y confianza, reafirmando nuestro compromiso de brindar",
            105,
            36,
            { align: "center" }
        );
        doc.text(
            "un servicio puntual, seguro y de calidad.",
            105,
            43,
            { align: "center" }
        );
        doc.text(
            "Su preferencia nos motiva a seguir mejorando para atenderles cada día mejor.",
            105,
            50,
            { align: "center" }
        );

        // Tomamos solo los primeros 10 registros para la izquierda
        const col1 = horarios.slice(0, 10);
        // El resto para la derecha
        const col2 = horarios.slice(10);

        // Columnas SIN unidad
        const columnas = ["Teziutlan", "Sector", "Tepepan"];

        // Datos tabla izquierda
        const filas1 = col1.map(h => [h.teziu, h.sector, h.tepe]);
        // Datos tabla derecha
        const filas2 = col2.map(h => [h.teziu, h.sector, h.tepe]);

        // Tabla izquierda
        autoTable(doc, {
            head: [columnas],
            body: filas1,
            startY: 60,
            margin: { left: 10, right: 120 },
            theme: "grid",
            styles: { font: "times", fontSize: 16, cellPadding: 1, lineWidth: 0.2 },
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: 0,
                fontSize: 18,
                fontStyle: "bold"
            },
            bodyStyles: { fillColor: [255, 255, 255], textColor: 0 }
        });

        // Tabla derecha
        autoTable(doc, {
            head: [columnas],
            body: filas2,
            startY: 60,
            margin: { left: 120, right: 10 },
            theme: "grid",
            styles: { font: "times", fontSize: 16, cellPadding: 1, lineWidth: 0.2 },
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: 0,
                fontSize: 18,
                fontStyle: "bold"
            },
            bodyStyles: { fillColor: [255, 255, 255], textColor: 0 }
        });

        // Pie de página
        doc.setFont("times", "italic");
        doc.setFontSize(11);
        doc.text("Atentamente,", 105, 250, { align: "center" });
        doc.text(
            "Lunea InterUrbana Sierra Norte",
            105,
            260,
            { align: "center" }
        );
        doc.text("© Joyboy", 105, 270, { align: "center" });

        doc.save("Horarios_Tepepan.pdf");
    };


    return (
        <div className="contenedor-horarios">
            <input
                type="date"
                value={fecha.toISOString().split("T")[0]}
                onChange={(e) => setFecha(new Date(e.target.value))}
            />
            <p>Semana: {getNumeroSemana(fecha)} ({numeroSemana === 1 ? "impar" : "par"})</p>
            <table className="tabla-horarios" ref={tablaRef}>
                <thead>
                    <tr>
                        <th colSpan={4}>{formatearFecha(fecha)}</th>
                    </tr>
                    <tr>
                        <th colSpan={4}>Horarios Tepepan</th>
                    </tr>
                    <tr>
                        <th>Unidad</th>
                        <th>Teziutlán</th>
                        <th>Sector</th>
                        <th>Tepepan</th>
                    </tr>
                </thead>
                <tbody>
                    {horarios.map((h, i) => (
                        <tr key={i} className={`sector-${h.sector.toLowerCase()}`}>
                            <td className={`unidad unidad-${h.unidad}`}>{h.unidad}</td>
                            <td>{h.teziu}</td>
                            <td>{h.sector}</td>
                            <td>{h.tepe}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn-pdf" onClick={generarPDF}>
                Descargar horarios en PDF
            </button>
            <br></br>
            <button className="btn-pdf" onClick={() => capturarTabla(tablaRef.current)}>
                Capturar Tabla 📸
            </button>
        </div>
    );
};

export default Horarios;
