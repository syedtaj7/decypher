// Mock AI Library - Using placeholder data instead of actual API calls

// Mock responses for different document types
const MOCK_RESPONSES = {
  land_deed: {
    generateContent: (prompt: string) => {
      if (prompt.toLowerCase().includes('summarize') || prompt.toLowerCase().includes('bullet points')) {
        return `# Land Deed Analysis Summary

**Key Points:**
• Property located at 123 Main Street, Springfield, County of Franklin
• Grantor: John Smith and Mary Smith (husband and wife)
• Grantee: Robert Johnson and Susan Johnson (joint tenants)
• Property size: 2.5 acres with residential dwelling
• Transfer date: January 15, 2024
• Purchase price: $450,000
• All liens and encumbrances cleared at closing`;
      }
      
      if (prompt.toLowerCase().includes('key terms') || prompt.toLowerCase().includes('important terms')) {
        return `# Important Terms in Land Deed

**Legal Terms:**
• **Grantor**: The seller (John & Mary Smith)
• **Grantee**: The buyer (Robert & Susan Johnson)
• **Joint Tenancy**: Both buyers own equal shares with right of survivorship
• **Warranty Deed**: Seller guarantees clear title
• **Legal Description**: Metes and bounds survey description included
• **Easements**: Utility easement along eastern boundary
• **Covenants**: Standard warranties against liens and encumbrances`;
      }
      
      if (prompt.toLowerCase().includes('concerning') || prompt.toLowerCase().includes('risk')) {
        return `# Potential Areas of Concern

**Review Recommended:**
• Utility easement may restrict building on eastern 10 feet
• Property taxes will be prorated as of closing date
• Well water system - buyer responsible for testing
• Septic system last inspected in 2022
• Property boundaries should be verified by survey
• Homeowner's insurance required before closing`;
      }
      
      return `# Land Deed Document Analysis

This land deed represents the legal transfer of property ownership from John and Mary Smith to Robert and Susan Johnson. The document includes:

**Property Details:**
- Address: 123 Main Street, Springfield
- Size: 2.5 acres with existing residence
- Legal description with precise boundaries

**Financial Terms:**
- Purchase price: $450,000
- Property taxes prorated to closing date
- All closing costs allocated per agreement

**Legal Protections:**
- Warranty deed with full covenants
- Title insurance recommended
- Clear title guaranteed by grantor

The deed appears to be properly executed with notarization and required signatures.`;
    },
    
    analyzeDocument: () => `# Land Deed Analysis Complete

I've analyzed your **land deed document** for the property transfer.

## 📋 Document Summary

**Property Transfer Details:**
- **From:** John Smith and Mary Smith (Grantors)
- **To:** Robert Johnson and Susan Johnson (Grantees)
- **Property:** 123 Main Street, Springfield, Franklin County
- **Size:** 2.5 acres with residential dwelling
- **Sale Price:** $450,000
- **Transfer Date:** January 15, 2024

## 🏠 Property Information

**Legal Description:**
The property is described using metes and bounds surveying, providing precise boundaries and measurements.

**Key Features:**
- Existing single-family residence
- Well water system (buyer to test)
- Septic system (last inspected 2022)
- Utility easement along eastern boundary

## ⚖️ Legal Aspects

**Type of Deed:** Warranty Deed with full covenants
**Ownership Structure:** Joint tenancy with right of survivorship
**Title Status:** Clear title guaranteed by grantors

## ⚠️ Important Considerations

1. **Utility Easement:** Eastern 10 feet may have building restrictions
2. **Water/Septic:** Systems require buyer verification and testing
3. **Property Taxes:** Will be prorated as of closing date
4. **Insurance:** Homeowner's coverage required before closing
5. **Survey:** Boundary verification recommended

This appears to be a standard residential property transfer with proper legal documentation.`
  }
};

// Helper function to generate content with mock data
export async function generateContent(prompt: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Return mock response for land deed
  return MOCK_RESPONSES.land_deed.generateContent(prompt);
}

// Function to analyze documents with mock data
export async function analyzeDocument(documentContent: string, question?: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  if (question) {
    return generateContent(question);
  }
  
  // Return mock analysis for land deed
  return MOCK_RESPONSES.land_deed.analyzeDocument();
}
