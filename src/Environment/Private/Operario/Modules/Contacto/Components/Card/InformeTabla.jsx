import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TableExport = ({data, titulo, status}) => {
  const exportToPdf = () => {
    // Por defecto será vertical (portrait), y si status es "horizontal" cambiará a landscape
    const doc = new jsPDF({
      orientation: status === 'horizontal' ? 'landscape' : 'portrait'
    });
    
    doc.setFontSize(16);
    doc.text(titulo, 14, 15);
    
    const headers = Object.keys(data[0]).map(
      header => header.charAt(0).toUpperCase() + header.slice(1)
    );
    const rows = data.map(row => Object.values(row));
    
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 25,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [66, 66, 66],
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 20 }
    });
    doc.save('informe.pdf');
  };
  
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const columnsWidth = Object.keys(data[0]).map(key => ({
      wch: Math.max(
        key.length,
        ...data.map(row => String(row[key]).length)
      )
    }));
    worksheet['!cols'] = columnsWidth;
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Personal');
    XLSX.writeFile(workbook, 'informe.xlsx');
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '8px'
            }}>{titulo}</h2>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>Informe:</p>
          </div>
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button 
              onClick={exportToExcel}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 16px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#047857'}
              onMouseOut={e => e.target.style.backgroundColor = '#059669'}
            >
              Exportar Excel
            </button>
            <button 
              onClick={exportToPdf}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 16px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#b91c1c'}
              onMouseOut={e => e.target.style.backgroundColor = '#dc2626'}
            >
              Exportar PDF
            </button>
          </div>
        </div>
        
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            overflowX: 'auto'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white'
            }}>
              <thead>
                <tr style={{
                  backgroundColor: '#f9fafb'
                }}>
                  {Object.keys(data[0]).map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: '12px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#4b5563',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr 
                    key={index} 
                    style={{
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={e => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseOut={e => e.target.style.backgroundColor = 'white'}
                  >
                    {Object.values(row).map((value, i) => (
                      <td
                        key={i}
                        style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          color: '#374151',
                          borderBottom: '1px solid #e5e7eb'
                        }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div style={{
          marginTop: '16px',
          fontSize: '14px',
          color: '#6b7280',
          textAlign: 'right'
        }}>
          Total de registros: {data.length}
        </div>
      </div>
    </div>
  );
};

export default TableExport;